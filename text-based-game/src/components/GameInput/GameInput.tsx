import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../state/reducers/gameStateReducer';
import { changeLocation, locationAddItem, locationRemoveItem } from '../../state/reducers/locationReducer';
import { setLocation, playerPickItem, playerDropItem } from '../../state/reducers/playerReducer';

const GameInput = ({ setLogs }: any) => {
    const [userInput, setInput] = useState("");

    const dispatch = useDispatch();
    const player = useSelector((state: any) => state.player);
    const locations = useSelector((state: any) => state.locations);
    const items = useSelector((state: any) => state.items);
    const playerLocation = locations[player.location];

    const logSetter = (newLog: string) => {
        setLogs((logs: string) => [
            ...logs,
            newLog
        ]);
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setInput(e.target.value);
            inputChewer(userInput);
            e.target.value = "";
        }
    }

    function inputChewer(userInput: string) {
        const inputArray = userInput.split(" ");
        const action = inputArray[0];
        inputArray.splice(0, 1);
        const target = inputArray.join("-");

        switch (action) {
            case "move":
                movementHandler(target);
                break;

            case "change":
                dispatch(changeLocation({ target: target, location: playerLocation.id }));
                break;

            case "take":
                pickItemHandler(target);
                break;

            case "drop":
                dropItemHandler(target);
                break;

            case "talk":
                npcTalkHandler(target);
                break;

            case "inspect":
                inspectHandler(target);
                break;

            default:
                logSetter("Error: Invalid command.");
                break;
        }
    }

    function movementHandler(target: string) {
        if (playerLocation.connects[target]) {
            const newLocation = playerLocation.connects[target];
            dispatch(setLocation(newLocation));
            logSetter("Moved to " + locations[newLocation].name);
        } else {
            console.log("error");
            logSetter("Error: Location unavailable.");
        }
    }

    function pickItemHandler(target: string) {

        if (playerLocation.contains[target]) {
            const pickedItem = items[playerLocation.contains[target]];

            if (pickedItem.event) {
                dispatch(playerPickItem({ newItem: pickedItem, event: pickedItem.event }));
            } else {
                dispatch(playerPickItem({ newItem: pickedItem }));
            }

            dispatch(locationRemoveItem({ itemKey: pickedItem.key, locationID: playerLocation.id }));
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

            if (!pickedItem.removeEventOnDrop === true) {
                dispatch(playerDropItem({ itemKey: pickedItem.key, itemID: pickedItem.id, locationID: playerLocation.id }));
            } else {
                dispatch(playerDropItem({ itemKey: pickedItem.key, itemID: pickedItem.id, locationID: playerLocation.id, event: "remove", eventCode: pickedItem.event }));
            }


            dispatch(locationAddItem({ itemKey: pickedItem.key, itemID: pickedItem.id, locationID: playerLocation.id }));
            logSetter("You dropped " + pickedItem.name);
        } else {
            console.log("error");
            logSetter("Error: Item does not exist.");
        }
    }

    function npcTalkHandler(target: string) {
        const npcID = playerLocation.presentNPCS[target];
        console.log(npcID);

        if (npcID !== undefined) {
            dispatch(updateState({ newState: "talk-state", focus: npcID }));
        }
    }

    function inspectHandler(target: string) {
        const targetID = playerLocation.contains[target];
        console.log(targetID);

        if (targetID !== undefined) {
            dispatch(updateState({ newState: "inspect-state", focus: targetID }));
        } else {
            logSetter("Error: Item does not exist.");
        }


    }

    return (
        <input autoFocus type="text" placeholder="user input" onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
    )
}

export { GameInput };