// All 18 Skyrim skills (key = camelCase used in state, label = display name)
export const SKILLS = [
  { key: 'alchemy', label: 'Alchemy' },
  { key: 'alteration', label: 'Alteration' },
  { key: 'archery', label: 'Archery' },
  { key: 'block', label: 'Block' },
  { key: 'conjuration', label: 'Conjuration' },
  { key: 'destruction', label: 'Destruction' },
  { key: 'enchanting', label: 'Enchanting' },
  { key: 'heavyArmor', label: 'Heavy Armor' },
  { key: 'illusion', label: 'Illusion' },
  { key: 'lightArmor', label: 'Light Armor' },
  { key: 'lockpicking', label: 'Lockpicking' },
  { key: 'oneHanded', label: 'One-Handed' },
  { key: 'pickpocket', label: 'Pickpocket' },
  { key: 'restoration', label: 'Restoration' },
  { key: 'smithing', label: 'Smithing' },
  { key: 'sneak', label: 'Sneak' },
  { key: 'speech', label: 'Speech' },
  { key: 'twoHanded', label: 'Two-Handed' },
];

// All 10 playable races
export const RACES = [
  'Nord',
  'Imperial',
  'Breton',
  'Redguard',
  'High Elf',
  'Wood Elf',
  'Dark Elf',
  'Orc',
  'Argonian',
  'Khajiit',
];

// Each race: one skill +10, five skills +5 (added on top of base level 15)
export const RACE_BONUSES = {
  Nord: {
    twoHanded: 10,
    block: 5,
    lightArmor: 5,
    oneHanded: 5,
    smithing: 5,
    speech: 5,
  },
  Imperial: {
    restoration: 10,
    block: 5,
    destruction: 5,
    enchanting: 5,
    heavyArmor: 5,
    oneHanded: 5,
  },
  Breton: {
    conjuration: 10,
    alchemy: 5,
    alteration: 5,
    illusion: 5,
    restoration: 5,
    speech: 5,
  },
  Redguard: {
    oneHanded: 10,
    archery: 5,
    alteration: 5,
    block: 5,
    destruction: 5,
    smithing: 5,
  },
  'High Elf': {
    illusion: 10,
    alteration: 5,
    conjuration: 5,
    destruction: 5,
    enchanting: 5,
    restoration: 5,
  },
  'Wood Elf': {
    archery: 10,
    alchemy: 5,
    lightArmor: 5,
    lockpicking: 5,
    pickpocket: 5,
    sneak: 5,
  },
  'Dark Elf': {
    destruction: 10,
    alteration: 5,
    illusion: 5,
    alchemy: 5,
    lightArmor: 5,
    sneak: 5,
  },
  Orc: {
    heavyArmor: 10,
    block: 5,
    enchanting: 5,
    oneHanded: 5,
    smithing: 5,
    twoHanded: 5,
  },
  Argonian: {
    lockpicking: 10,
    alteration: 5,
    lightArmor: 5,
    pickpocket: 5,
    restoration: 5,
    sneak: 5,
  },
  Khajiit: {
    sneak: 10,
    archery: 5,
    alchemy: 5,
    lockpicking: 5,
    oneHanded: 5,
    pickpocket: 5,
  },
};

// Base stats every new character starts with
export const BASE_STATS = {
  health: 100,
  magicka: 100,
  stamina: 100,
};

// Create a fresh skills object — every skill starts at 15
export function createBaseSkills() {
  const skills = {};
  SKILLS.forEach(({ key }) => {
    skills[key] = 15;
  });
  return skills;
}

// Apply race bonuses on top of the base 15 for each skill
export function applyRaceBonuses(skills, race) {
  const bonuses = RACE_BONUSES[race] || {};
  const updated = { ...skills };
  Object.entries(bonuses).forEach(([skillKey, bonus]) => {
    updated[skillKey] = (updated[skillKey] ?? 15) + bonus;
  });
  return updated;
}

// XP needed to reach the next level: (currentLevel * 25) + 75
export function getLevelThreshold(level) {
  return level * 25 + 75;
}

// XP from raising one skill from oldLevel to newLevel (sum of oldLevel+1 .. newLevel)
export function calculateSkillXpGain(oldLevel, newLevel) {
  if (newLevel <= oldLevel) return 0;
  const steps = newLevel - oldLevel;
  return ((oldLevel + 1 + newLevel) * steps) / 2;
}

// Skyrim skill level cap for sliders
export const SKILL_CAP = 100;
