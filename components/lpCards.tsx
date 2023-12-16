import { Card, CardHeader } from "@/components/ui/card";
import { LayersIcon } from "lucide-react";

type Props = {
    name: string;
};


export default function LpCard(props: Props) {
    const RenderIcon = () => {
        if (props.name === "") {
            return
        }

        if (props.name === "") {
            return
        }

        if (props.name === "") {
            return
        }

        if (props.name === "") {
            return
        }

        if (props.name === "") {
            return
        }

        return (<LayersIcon />)
    }


    return (
        <div className="grid md:grid-cols-6 grid-cols-3 gap-[32px] m-auto mt-12 w-[100px] text-center leading-tight">
            <div  className="w-[100px] text-center leading-tight">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <RenderIcon />
            </CardHeader>
        </Card>
        </div>
        <span className="text-[#878787] dark:text-[#606060] text-sm">{props.name}</span>
        </div>
    );
}