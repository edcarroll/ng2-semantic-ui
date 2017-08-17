export type DropdownOpenTrigger = "hover" | "click";

export const DropdownOpenTrigger = {
    Hover: "hover" as DropdownOpenTrigger,
    Click: "click" as DropdownOpenTrigger
};

export type DropdownCloseTrigger = "outsideHover" | "click" | "outsideClick" | "itemClick";

export const DropdownCloseTrigger = {
    OutsideHover: "outsideHover" as DropdownCloseTrigger,
    Click: "click" as DropdownCloseTrigger,
    OutsideClick: "outsideClick" as DropdownCloseTrigger,
    ItemClick: "itemClick" as DropdownCloseTrigger
};
