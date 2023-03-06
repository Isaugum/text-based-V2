import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../state/reducers/gameStateReducer';
import { processResponse } from '../../state/reducers/npcReducer';


const ConversationInput = ({ setLogs }: any) => {
    const [userInput, setInput] = useState("");

    const dispatch = useDispatch();
    const gameState = useSelector((state: any) => state.gameState);
    const player = useSelector((state: any) => state.player);
    const locations = useSelector((state: any) => state.locations);
    const items = useSelector((state: any) => state.items);
    const NPCS = useSelector((state: any) => state.npcs);

    const talkingNPC = NPCS[gameState.stateFocus];

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setInput(e.target.value);
            inputChewer(userInput);
            e.target.value = "";
        }
    }

    const logSetter = (newLog: string) => {
        setLogs((logs: string) => [
            ...logs,
            newLog
        ]);
    }

    function inputChewer(userInput: string) {
        const inputArray = userInput.split(" ");
        const action = inputArray[0];
        inputArray.splice(0, 1);
        const target = inputArray.join("-");

        switch (action) {
            case "back":
                backpaddler(target);
                break;

            case "1":
                choiceInput(action);
                break;

            case "2":
                choiceInput(action);
                break;

            default:
                logSetter("Error: Invalid command.");
                break;
        }
    }

    function backpaddler(target: string) {
        dispatch(updateState({ newState: "game-state", focus: 0 }));
    }

    function choiceInput(target: string) {
        const responseTarget = talkingNPC.dialogueTree[talkingNPC.currentNode].responses[parseInt(target) - 1].target;

        if (responseTarget === "end") {
            dispatch(processResponse({ npcID: gameState.stateFocus, response: responseTarget }));
            dispatch(updateState({ newState: "game-state", focus: 0 }));
        } else {
            dispatch(processResponse({ npcID: gameState.stateFocus, response: responseTarget }));
        }


    }

    return (
        <input autoFocus type="text" placeholder="user input" onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
    )
}

export { ConversationInput };