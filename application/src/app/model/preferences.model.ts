export enum Preference {
    mandatory = "mandatory",
    preferences = "preferences",
    analytics = "analytics",
    marketing = "marketing"
}

export type Preferences = {
    mandatory: boolean;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
}