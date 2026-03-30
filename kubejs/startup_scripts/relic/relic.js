let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.getRelicId = function(name) {
    return "marguerite:" + name
}

StartupEvents.registry('item', event => {
    let relics = global.relicRegister.relics
    for (let i = 0; i < relics.length; i ++) {
        let relic = relics[i]
        let e = event.create(global.getRelicId(relic.name))
        .displayName(relic.nameZH && relic.nameZH.length > 0 ? relic.nameZH : relic.name)
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .onEquip((slotContext, oldStack, newStack) => {
                    global.updatePlayerBackpack(slotContext.entity())
                    relic.onEquip(slotContext, oldStack, newStack)
                })
                .onUnequip((slotContext, oldStack, newStack) => {
                    global.updatePlayerBackpack(slotContext.entity())
                    relic.onUnEquip(slotContext, oldStack, newStack)
                })
                .canEquip((slotContext, stack) => relic.canEquip ? relic.canEquip(slotContext, stack) : true)
                .canUnequip((slotContext, stack) => relic.canUnEquip ? relic.canUnEquip(slotContext, stack) : true)
        )
        .maxStackSize(1)
        .tag("curios:package")
        for (let j = 0; j < relic.tags.length; j ++) {
            let tag = relic.tags[j]
            if (tag) {
                e.tag(tag.id)
            } else {
                console.warn("Relic tag is null: " + relic)
            }
        }
    }
})

