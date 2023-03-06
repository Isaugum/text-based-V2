interface Connects {
    [direction: string]: number;
}

interface Contains {
    [name: string]: number;
}

interface presentNPCS {
    [name: string]: number
}

interface Locked {
    isLocked: boolean,
    unlockID?: number
}

interface Location {
    id: number;
    name: string;
    area: string;
    description: string;
    connects: Connects;
    contains: Contains;
    presentNPCS: presentNPCS;
    locked: Locked;
}

export interface Locations {
    [locationID: number]: Location;
}