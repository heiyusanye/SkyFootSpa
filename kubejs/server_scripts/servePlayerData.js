let SERVE_PARTS = ["jiaobei", "jiaozhang", "jiaogen", "jiaozhi", "jiaoxin"]

let SERVE_DEMAND_KEY_TO_PART = {
    pfDemandJiaobei: "jiaobei",
    pfDemandJiaozhang: "jiaozhang",
    pfDemandJiaogen: "jiaogen",
    pfDemandJiaozhi: "jiaozhi",
    pfDemandJiaoxin: "jiaoxin",
}

let SERVE_DEFAULTS = [
    // serve_*：玩家“服务玩法”的自定义属性（存在 persistentData 里）
    // - serve_money / serve_satisfaction：统计值（累积/展示用）
    // - serve_cfg_*：配置值（决定每次点击加多少满意度/收益、倍率、钻石倍率、分部位参数）
    { key: "serve_money", type: "int", value: 0 },
    { key: "serve_satisfaction", type: "int", value: 0 },

    { key: "serve_cfg_correct_sat", type: "int", value: 10 },
    { key: "serve_cfg_wrong_sat", type: "int", value: 10 },
    { key: "serve_cfg_correct_money", type: "int", value: 1 },
    { key: "serve_cfg_wrong_money", type: "int", value: 0 },
    { key: "serve_cfg_money_mult", type: "float", value: 1.0 },
    { key: "serve_cfg_sat_mult", type: "float", value: 1.0 },
    { key: "serve_cfg_diamond_mult", type: "float", value: 1.0 },
]

function servePut(pd, type, key, value) {
    if (type === "int") pd.putInt(key, value)
    else if (type === "float") pd.putFloat(key, value)
}

function serveMaybeInitByContains(pd, key, type, value) {
    if (!pd.contains(key)) servePut(pd, type, key, value)
}

function serveMaybeInitByNullGet(pd, key, type, value) {
    if (type === "int") {
        if (pd.getInt(key) == null) pd.putInt(key, value)
        return
    }
    if (type === "float") {
        if (pd.getFloat(key) == null) pd.putFloat(key, value)
        return
    }
}

function serveEnsureDefaults(pd) {
    if (typeof pd.contains === "function") {
        for (let i = 0; i < SERVE_DEFAULTS.length; i++) {
            let d = SERVE_DEFAULTS[i]
            serveMaybeInitByContains(pd, d.key, d.type, d.value)
        }

        for (let i = 0; i < SERVE_PARTS.length; i++) {
            let part = SERVE_PARTS[i]
            serveMaybeInitByContains(pd, "serve_cfg_sat_" + part, "int", 10)
            serveMaybeInitByContains(pd, "serve_cfg_money_" + part, "int", 1)
        }
        return
    }

    // 兼容：某些环境没有 contains()，用 getXxx(...) == null 来判断是否需要初始化
    for (let i = 0; i < SERVE_DEFAULTS.length; i++) {
        let d = SERVE_DEFAULTS[i]
        serveMaybeInitByNullGet(pd, d.key, d.type, d.value)
    }
    for (let i = 0; i < SERVE_PARTS.length; i++) {
        let part = SERVE_PARTS[i]
        serveMaybeInitByNullGet(pd, "serve_cfg_sat_" + part, "int", 10)
        serveMaybeInitByNullGet(pd, "serve_cfg_money_" + part, "int", 1)
    }
}

// 初始化玩家服务数据：确保 persistentData 中存在 serve_* 默认字段（仅在缺失时写入默认值）
global.serveEnsurePlayerData = global.serveEnsurePlayerData || function (player) {
    if (player == null || player.persistentData == null) return
    serveEnsureDefaults(player.persistentData)
}

// 读取玩家累计收益（serve_money）
global.serveGetMoney = global.serveGetMoney || function (player) {
    global.serveEnsurePlayerData(player)
    return player.persistentData.getInt("serve_money") || 0
}

// 设置玩家累计收益（serve_money），会自动向下取整且不小于 0
global.serveSetMoney = global.serveSetMoney || function (player, amount) {
    global.serveEnsurePlayerData(player)
    let v = Math.max(0, Math.floor(amount || 0))
    player.persistentData.putInt("serve_money", v)
    return v
}

// 增加玩家累计收益（serve_money），delta 可为负数
global.serveAddMoney = global.serveAddMoney || function (player, delta) {
    global.serveEnsurePlayerData(player)
    let next = (player.persistentData.getInt("serve_money") || 0) + Math.floor(delta || 0)
    return global.serveSetMoney(player, next)
}

// 读取玩家累计满意度（serve_satisfaction）
global.serveGetSatisfaction = global.serveGetSatisfaction || function (player) {
    global.serveEnsurePlayerData(player)
    return player.persistentData.getInt("serve_satisfaction") || 0
}

// 设置玩家累计满意度（serve_satisfaction），范围限制在 0~100
global.serveSetSatisfaction = global.serveSetSatisfaction || function (player, value) {
    global.serveEnsurePlayerData(player)
    let v = Math.max(0, Math.min(100, Math.floor(value || 0)))
    player.persistentData.putInt("serve_satisfaction", v)
    return v
}

// 增加玩家累计满意度（serve_satisfaction），delta 可为负数
global.serveAddSatisfaction = global.serveAddSatisfaction || function (player, delta) {
    global.serveEnsurePlayerData(player)
    let next = (player.persistentData.getInt("serve_satisfaction") || 0) + Math.floor(delta || 0)
    return global.serveSetSatisfaction(player, next)
}

// 读取服务玩法的“通用配置”（倍率/基准值等），用于服务端结算逻辑
global.serveGetConfig = global.serveGetConfig || function (player) {
    global.serveEnsurePlayerData(player)
    let pd = player.persistentData
    let cfg = {
        correctSat: pd.getInt("serve_cfg_correct_sat") || 10,
        wrongSat: pd.getInt("serve_cfg_wrong_sat") || 10,
        correctMoney: pd.getInt("serve_cfg_correct_money") || 1,
        wrongMoney: pd.getInt("serve_cfg_wrong_money") || 0,
        moneyMult: pd.getFloat("serve_cfg_money_mult") || 1.0,
        satMult: pd.getFloat("serve_cfg_sat_mult") || 1.0,
        diamondMult: pd.getFloat("serve_cfg_diamond_mult") || 1.0,
    }
    return cfg
}

// 按部位读取本次“有效点击”的满意度/收益配置
// - demandKey 是服务端使用的需求键（例如 pfDemandJiaobei）
// - 返回 { sat, money }
global.serveGetPartConfig = global.serveGetPartConfig || function (player, demandKey) {
    global.serveEnsurePlayerData(player)
    let pd = player.persistentData
    let part = SERVE_DEMAND_KEY_TO_PART[demandKey]
    if (!part) {
        return { sat: pd.getInt("serve_cfg_correct_sat") || 10, money: pd.getInt("serve_cfg_correct_money") || 1 }
    }

    let sat = pd.getInt("serve_cfg_sat_" + part)
    let money = pd.getInt("serve_cfg_money_" + part)
    if (sat == null || sat < 0) sat = pd.getInt("serve_cfg_correct_sat") || 10
    if (money == null) money = pd.getInt("serve_cfg_correct_money") || 1
    return { sat: sat, money: money }
}

// 重置“服务玩法配置”到默认值（用于背包重算：先 reset 再叠加遗物效果）
global.serveResetPlayerServeConfig = global.serveResetPlayerServeConfig || function (player) {
    if (player == null || player.persistentData == null) return
    global.serveEnsurePlayerData(player)
    let pd = player.persistentData
    pd.putInt("serve_cfg_correct_sat", 10)
    pd.putInt("serve_cfg_wrong_sat", 10)
    pd.putInt("serve_cfg_correct_money", 1)
    pd.putInt("serve_cfg_wrong_money", 0)
    pd.putFloat("serve_cfg_money_mult", 1.0)
    pd.putFloat("serve_cfg_sat_mult", 1.0)
    pd.putFloat("serve_cfg_diamond_mult", 1.0)

    for (let i = 0; i < SERVE_PARTS.length; i++) {
        let part = SERVE_PARTS[i]
        pd.putInt("serve_cfg_sat_" + part, 10)
        pd.putInt("serve_cfg_money_" + part, 1)
    }
}
