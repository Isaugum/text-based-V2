interface Responses {
    text: string;
    target: string;
}

interface dialogueTree {
    [id: string]: {
        text: string;
        responses: Responses[];
    }
}

export interface NPC {
    [id: number]: {
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

        locationDescription: string;
        dialogueTree: dialogueTree;
        currentNode: string;
        trigger: number;
    }

}