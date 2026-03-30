// priority: 9
global.relicRegister.register(relic => {
    relic.setName("serve_soft_glove")
        .setNameZH("轻柔手套")
        .setDescription(Text.gray("每次有效点击额外+5满意度"))
        .setStory("手法更轻柔，让对方更容易满意。")
        .setOnLoad((player, i) => {
            if (!player || !player.persistentData) return

            if (typeof global.serveEnsurePlayerData === "function") {
                global.serveEnsurePlayerData(player)
            }

            let pd = player.persistentData
            let parts = ["jiaobei", "jiaozhang", "jiaogen", "jiaozhi", "jiaoxin"]
            for (let j = 0; j < parts.length; j++) {
                let key = "serve_cfg_sat_" + parts[j]
                pd.putInt(key, (pd.getInt(key) || 10) + 5)
            }
        }).setPool(global.relicPool.common)
})
