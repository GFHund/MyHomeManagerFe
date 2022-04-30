import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrafficComponent } from "../page/traffic/traffic.component";
import { CommonComponentModule } from "./common-component.module";

const routes: Routes = [
    {path: '',component: TrafficComponent}
]

@NgModule({
    imports: [CommonModule,RouterModule.forChild(routes),CommonComponentModule],
    exports: [RouterModule],
    declarations: [
        TrafficComponent
    ]
})
export class TrafficModule{}