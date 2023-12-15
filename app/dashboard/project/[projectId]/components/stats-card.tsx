import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayersIcon, PieChartIcon, RocketIcon } from "@radix-ui/react-icons";

type Props = {
  name: string;
  count: number;
};

export default function StatsCard(props: Props) {
  const RenderIcon = () => {
    if(props.name === "API Requests"){
      return (<PieChartIcon />)
    }

    if(props.name === "Features"){
      return (<RocketIcon />)
    }

    return (<LayersIcon />)
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.name}</CardTitle>
        <RenderIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.count}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
}
