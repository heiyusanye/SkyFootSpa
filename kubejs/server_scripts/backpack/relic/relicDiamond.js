// var attributes = "generic.max_health" | "minecraft:generic.max_health" | "generic.follow_range" | 
// "minecraft:generic.follow_range" | "generic.knockback_resistance" | "minecraft:generic.knockback_resistance" | 
// "generic.movement_speed" | "minecraft:generic.movement_speed" | "generic.flying_speed" | 
// "minecraft:generic.flying_speed" | "generic.attack_damage" | "minecraft:generic.attack_damage" | 
// "generic.attack_knockback" | "minecraft:generic.attack_knockback" | "generic.attack_speed" | 
// "minecraft:generic.attack_speed" | "generic.armor" | "minecraft:generic.armor" | "generic.armor_toughness" | 
// "minecraft:generic.armor_toughness" | "generic.luck" | "minecraft:generic.luck" | "zombie.spawn_reinforcements" | 
// "minecraft:zombie.spawn_reinforcements" | "horse.jump_strength" | "minecraft:horse.jump_strength" | 
// "attributeslib:armor_pierce" | "attributeslib:armor_shred" | "attributeslib:arrow_damage" | 
// "attributeslib:arrow_velocity" | "attributeslib:cold_damage" | "attributeslib:crit_chance" | 
// "attributeslib:crit_damage" | "attributeslib:current_hp_damage" | "attributeslib:dodge_chance" | 
// "attributeslib:draw_speed" | "attributeslib:experience_gained" | "attributeslib:fire_damage" | 
// "attributeslib:ghost_health" | "attributeslib:healing_received" | "attributeslib:life_steal" | 
// "attributeslib:mining_speed" | "attributeslib:overheal" | "attributeslib:prot_pierce" | 
// "attributeslib:prot_shred" | "attributeslib:elytra_flight" | "attributeslib:creative_flight" | 
// "l2damagetracker:crit_rate" | "l2damagetracker:crit_damage" | "l2damagetracker:bow_strength" | 
// "l2damagetracker:explosion_damage" | "l2damagetracker:fire_damage" | "l2damagetracker:magic_damage" | 
// "l2damagetracker:damage_absorption" | "l2damagetracker:damage_reduction" | "forge:swim_speed" | 
// "forge:nametag_distance" | "forge:entity_gravity" | "forge:block_reach" | "forge:entity_reach" | 
// "forge:step_height_addition" | "l2hostility:extra_difficulty" | "l2hostility:extra_scale";

// 钻石效果：每有一颗钻石，增加2%的基础伤害（只计算与钻石同一行的其他物品数量）
function diamondEffect(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 0.1, 'addition');
  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect1(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 0.1, 'addition');
  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect2(player, name, i) {
  player.modifyAttribute('generic.movement_speed', name + i, 0.1, 'addition');
  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect3(player, name, i) {
  player.modifyAttribute('generic.max_health', name + i, 1, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect4(player, name, i) {
  player.modifyAttribute('l2damagetracker:crit_rate', name + i, 0.1, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect5(player, name, i) {
  player.modifyAttribute('generic.armor', name + i, 1, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect6(player, name, i) {
  player.modifyAttribute('generic.attack_speed', name + i, 0.1, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect7(player, name, i) {
  player.modifyAttribute('generic.armor_toughness', name + i, 1, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect8(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect9(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect10(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect11(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect12(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect13(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect14(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect15(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect16(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect17(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect18(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect19(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}

function relicEffect20(player, name, i) {
  player.modifyAttribute('generic.attack_damage', name + i, 8, 'addition');

  console.log("backpack effect: " + name + ", slot: " + i)
}