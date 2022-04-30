import { Component, OnInit } from "@angular/core";
import { ClosureList } from "src/app/model/traffic/ClosureList";
import { WarningList } from "src/app/model/traffic/WarningList";
import { TrafficService } from "src/app/service/traffic/traffic.service";

@Component({
    selector: 'app-traffic',
    templateUrl: './traffic.component.html'
})
export class TrafficComponent implements OnInit{

    closures?: ClosureList;
    warnings?: WarningList;

    constructor(public trafficService: TrafficService){}

    ngOnInit(): void {
        
    }

    onAutobahnSelected(roadId: string){
        this.trafficService.getTrafficClosureList(roadId).subscribe((closures) => {
            console.log(closures);
            this.closures = closures;
        });
        this.trafficService.getTrafficWarningList(roadId).subscribe((warnings) => {
            console.log(warnings);
            this.warnings = warnings
        })
    }

}