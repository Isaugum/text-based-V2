import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../state/reducers/gameStateReducer';
import { itemAddItem, itemRemoveItem } from '../../state/reducers/itemReducer';
import { locationRemoveItem } from '../../state/reducers/locationReducer';
import { playerDropItem, playerPickItem } from '../../state/reducers/playerReducer';

const InspectionInput = ({ setLogs }: any) => {
    const [userInput, setInput] = useState("");

    const dispatch = useDispatch();
    const gameState = useSelector((state: any) => state.gameState);
    const player = useSelector((state: any) => state.player);
    const locations = useSelector((state: any) => state.locations);
    const items = useSelector((state: any) => state.items);
    const playerLocation = locations[player.location];

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

            case "pick":
                pickItemHandler(target);
                break;

            case "drop":
                dropItemHandler(target);
                break;

            default:
                logSetter("Error: Invalid command.");
                break;
        }
    }

    function backpaddler(target: string) {
        dispatch(updateState({ newState: "game-state", focus: 0 }));
    }

    function pickItemHandler(target: string) {

        if (items[items[gameState.stateFocus].contains[target]]) {
            const pickedItem = items[items[gameState.stateFocus].contains[target]];

            if (pickedItem.event) {
                dispatch(playerPickItem({ newItem: pickedItem, event: pickedItem.event }));
            } else {
                dispatch(playerPickItem({ newItem: pickedItem }));
            }

            dispatch(itemRemoveItem({ itemKey: pickedItem.key, containerID: gameState.stateFocus }));
            logSetter("You picked up " + pickedItem.name);
        } else {
            console.log("error");
            logSetter("Error: Item does not exist.");
        }
    }

    function dropItemHandler(target: string) {
        const pickedItemFilter = player.inventory.filter((item: any) => {
            if (item.key === target) {
                return item;
            }

        })

        if (pickedItemFilter.length === 1) {
            const pickedItem = pickedItemFilter[0];
            console.log(pickedItem.removeEventOnDrop);
            if (!pickedItem.removeEventOnDrop === true) {
                dispatch(playerDropItem({ itemKey: pickedItem.key, itemID: pickedItem.id, locationID: playerLocation.id }));
            } else {
                dispatch(playerDropItem({ itemKey: pickedItem.key, itemID: pickedItem.id, locationID: playerLocation.id, event: "remove", eventCode: pickedItem.event }));
            }

            dispatch(itemAddItem({ itemKey: pickedItem.key, itemID: pickedItem.id, containerID: gameState.stateFocus }));
            logSetter("You dropped " + pickedItem.name);
        } else {
            console.log("error");
            logSetter("Error: Item does not exist.");
        }
    }

    return (
        <input autoFocus type="text" placeholder="user input" onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
    )
}

export { InspectionInput };
