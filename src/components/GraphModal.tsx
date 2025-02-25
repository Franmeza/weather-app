import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TemperatureGraph from "./TemperatureGraph";

function GrahpModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <i className="fa-solid fa-chart-line fa-sm"></i>
        </DialogTrigger>

        <DialogContent className="bg-[#20293A] border-none max-w-[620px]">
          <DialogHeader>
            <DialogTitle className="mb-2">Last 7 days temperature</DialogTitle>
          </DialogHeader>
          <TemperatureGraph />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GrahpModal;
