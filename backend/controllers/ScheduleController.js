import ScheduleModel from "../models/schedule.js";

class ScheduleController {
  static scheduleMove = async (req, res) => {
    try {
      const {
        originAddress,
        destinationAddress,
        vehicleType,
        customerName,
        customerPhone,
        moveDate,
      } = req.body;

      const moveSchedule = new ScheduleModel({
        originAddress,
        destinationAddress,
        vehicleType,
        customerName,
        customerPhone,
        moveDate,
      });
      console.log(moveSchedule);
      const result = await moveSchedule.save();
      console.log(result);
      res.json({ message: "ok", success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // static move = async (req, res) =>{
  //    const {name, date} = req.body
  //    try {
  //     const newmove = MoveModel({
  //       name,
  //       date,
  //     })
  //     console.log(move)
  //     const reslt = await newmove.save();
  //     res.json({ message: 'Move scheduled successfully',success: true, });

  //    } catch (error) {
  //     res.status(500).json({ message: error.message });

  //    }
  // }
}

export default ScheduleController;
