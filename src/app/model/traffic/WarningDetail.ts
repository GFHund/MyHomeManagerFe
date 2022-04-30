import { Coordinate } from "./Coordinate";

export interface WarningDetail{
    extent: string;
    identifier: string;
    routeRecommendation: any;
    coordinate: Coordinate;
    footer: string[];
    icon: string;
    isBlocked: string;
    description: string[];
    title: string;
    point: string;
    display_type:string;
    lorryParkingFeatureIcons: any;
    future:boolean
    subtitle: string;
    startTimestamp:string;
}