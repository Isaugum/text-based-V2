import { createSlice } from '@reduxjs/toolkit';
import { NPC } from '../../types';

export const NPCs: NPC = {
    1001: {
        name: "Unknown Soldier",
        health: 100,
        stamina: 100,
        strength: 10,
        dexterity: 10,
        constitution: 10,
        charisma: 10,
        perception: 10,
        inventory: [],
        gold: 10,
        location: 1001,
        locationDescription: "You see a soldier standing a bit further away",
        dialogueTree: {
            "start": {
                text: "Hello there, how are you?",
                responses: [
                    {
                        text: "I am good! How are you?",
                        target: "greet-back"
                    }
                ]
            },
            "greet-back": {
                text: "I am good. What can I help you with?",
                responses: [
                    {
                        text: "I feel a bit lost",
                        target: "lost-response"
                    },
                    {
                        text: "Where do I find the letter?",
                        target: "advice-response"
                    }
                ]
            },
            "lost-response": {
                text: "I cannot help you with that.",
                responses: [
                    {
                        text: "Ok bye",
                        target: "end"
                    }
                ]
            },
            "advice-response": {
                text: "You should check the letter on your table",
                responses: [
                    {
                        text: "Ok bye",
                        target: "end"
                    }
                ]
            },
            "trigger": {
                text: "I see you got your letter! Did you read it?",
                responses: [
                    {
                        text: "Yes I did",
                        target: "end"
                    }
                ]
            }
        },
        currentNode: "start",
        trigger: 1001
    }

}

export const npcSlice = createSlice({
    name: "player",
    initialState: NPCs,
    reducers: {
        processResponse: (state, action) => {
            let choice = action.payload.response;
            const npcID = action.payload.npcID;

            if (choice === "end") {
                choice = "start";
            }

            state[npcID].currentNode = choice;
        }
    }
})

export default npcSlice.reducer;
export const { processResponse } = npcSlice.actions;