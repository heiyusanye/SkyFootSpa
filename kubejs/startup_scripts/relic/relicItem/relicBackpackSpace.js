// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.setName("backpack_space")
        .setNameZH("背包镶板")
        .setDescription(Text.gray("无效果"))
        .setSpecialDescription(Text.gray("使用钻石取下"))
        .setStory("占据背包空间的镶板，可以用钻石将其取下。")
        .setOnUnEquip((slotContext, oldStack, newStack) => {
            global.updatePlayerBackpack(slotContext.entity())
            var player1 = slotContext.entity();
            var items = player1.inventory;
            if (player1.isPlayer()) {
                var items = player1.getInventory().getAllItems();
                for (var item of items) {
                    if (item.id !== null) {
                        if (item.id == 'minecraft:diamond') {
                            item.setCount(item.getCount() - 1);
                            break;
                        }
                    }
                }
            }
        })
        .setCanUnEquip((slotContext, stack) => {
            console.log("can unequip")
            var player1 = slotContext.entity();
            player1.getLevel().getPlayers()
            if (player1.isPlayer()) {
                var items = player1.getInventory().getAllItems();
                for (var item of items) {
                    if (item.id !== null) {
                        player1.tell(item.id);
                        if (item.id == 'minecraft:diamond') {
                            return true;
                        }
                    }
                }
            }
            return false
        }).setPool(global.relicPool.space)
})