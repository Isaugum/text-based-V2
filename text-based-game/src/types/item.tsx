interface Contains {
    [keyword: string]: number;
}

interface Item {
    id: number;
    name: string;
    key: string;
    description: string;
    locationDescription: string;
    contains?: Contains;
    value: number;
    weight: number;
    event?: number;
    removeEventOnDrop?: boolean;
}

export interface Items {
    [itemID: number]: Item;
}