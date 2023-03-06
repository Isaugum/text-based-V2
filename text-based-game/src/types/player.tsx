export interface Player {
    name: string;
    health: number;
    stamina: number;
    strength: number;
    dexterity: number;
    constitution: number;
    charisma: number;
    perception: number;
    inventory: any[];
    gold: number;
    location: number;
    isTierd: boolean;
    isDrunk: boolean;
    events: number[];
}