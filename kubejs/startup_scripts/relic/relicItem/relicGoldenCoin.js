// priority: 9
global.relicRegister.register(relic => {
    relic.setName("goldencoin")
        .setNameZH("闪闪金币")
        .setDescription(Text.gray("最终获得钻石数量*1.2"))
        .setStory("谁会拒绝如此多的财宝呢？")
        .setOnLoad((player, i) => {
            if (!player || !player.persistentData) return

            if (typeof global.serveEnsurePlayerData === "function") {
                global.serveEnsurePlayerData(player)
            }

            let pd = player.persistentData
            let mult = pd.getFloat("serve_cfg_diamond_mult") || 1.0
            pd.putFloat("serve_cfg_diamond_mult", mult * 1.2)
        }).setPool(global.relicPool.common)
})
