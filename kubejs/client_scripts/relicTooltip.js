ItemEvents.tooltip(event => {
    let relics = global.relicRegister.relics
    event.addAdvanced('marguerite:dungeon_reward', (item, advanced, text) => {
        text.add(Text.red(`右键获取奖励`))
    })
    for (let i = 0; i < relics.length; i ++) {
        let relic = relics[i]
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            if (relic.description != null) {
                text.add(relic.description)
            }
        })
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            if (relic.specialDescription != null) {
                text.add(relic.specialDescription)
            }
        })
        for (let k = 0; k < relic.guideTexture.length; k ++) {
            let texture = relic.guideTexture[k]
            event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                text.add(texture)
            })
        }
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(Text.darkGray("-----------------------"))
        })
        console.log(relic.tags.length)
        console.log("relic.tags.length")
        for (let j = 0; j < relic.tags.length; j ++) {
            console.log(tag)
            let tag = relic.tags[j]
            switch (tag.color) {
                case 'gray':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.gray(tag.nameZH))
                    })
                    break;
                case 'yellow':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.yellow(tag.nameZH))
                    })
                    break;
                case 'blue':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.blue(tag.nameZH))
                    })
                    break;
                case 'green':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.green(tag.nameZH))
                    })
                    break;
                case 'white':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.white(tag.nameZH))
                    })
                    break;
            }
        }
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(Text.darkGray("-----------------------"))
        })
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(Text.darkGray(relic.story))
        })
    }
})