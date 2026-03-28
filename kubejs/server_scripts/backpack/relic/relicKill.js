let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

EntityEvents.death(event => {
    const { source } = event;

    // 确保攻击者是玩家且生物为地牢怪物
    if (source.actual && source.actual.isPlayer() && source.actual.level.dimension.toString().includes('dimdungeons:dungeon_dimension')) {
        let player = source.actual;

        // 获取玩家装备的所有遗物
        let curiosHelper = curiosApi.getCuriosHelper();
        let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

        // 遍历所有遗物槽位
        for (let i = 0; i < curiosAll.getSlots(); i++) {
            let itemStack = curiosAll.getStackInSlot(i);
            if (!itemStack.isEmpty()) {
                let itemId = itemStack.getId();

                // 在全局遗物列表中查找匹配的遗物
                for (let j = 0; j < global.relicRegister.relics.length; j++) {
                    let relic = global.relicRegister.relics[j];
                    if (itemId == "marguerite:" + relic.name) {
                        // 如果遗物定义了 onKill，则执行它
                        if (relic.onKill) {
                            relic.onKill(player, i);
                        }
                    }
                }
            }
        }
    }
});