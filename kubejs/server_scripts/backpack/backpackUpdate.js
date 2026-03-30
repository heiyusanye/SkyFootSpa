let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

function getAttributeList() {
  return [
    "generic.max_health", 
    "generic.follow_range",
    "generic.knockback_resistance",
    "generic.movement_speed", 
    "generic.flying_speed",
    "generic.attack_damage",
    "generic.attack_knockback", 
    "generic.attack_speed",
    "generic.armor", 
    "generic.armor_toughness",
    "generic.luck", 
    "l2damagetracker:crit_rate",
  ];
}

global.updatePlayerBackpack = function (player) {
  // 获取Curios物品
  let curiosHelper = curiosApi.getCuriosHelper();
  let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

  if (typeof global.serveResetPlayerServeConfig === "function") {
    global.serveResetPlayerServeConfig(player)
  }

  for (let i = 0; i < getAttributeList().length; i++) {
    if (player.getAttributes().hasAttribute(getAttributeList()[i])) {
      if (player.getAttribute(getAttributeList()[i]) != null) {
        player.getAttribute(getAttributeList()[i]).removeModifiers();
      }
    }
  }

  // 遍历所有Curios槽位
  for (let i = 0; i < curiosAll.getSlots(); i++) {
    let curiosItem = curiosAll.getStackInSlot(i);
    if (!curiosItem.isEmpty()) {
      // 根据物品执行不同效果
      allRelicEffect(player, curiosItem.getId(), i);
    }
  }
}
  
function allRelicEffect(player, name, i) {
  let relics = global.relicRegister.relics;
  for (let j = 0; j < relics.length; j++) {
    let relic = relics[j];
    if (name == global.getRelicId(relic.name)) {
      relic.onLoad(player, i)
    }
  }
}
