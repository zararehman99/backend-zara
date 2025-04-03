import { Request, Response } from "express";
import { Baby, Feed, PumpSession, HealthLog, SleepLog } from "../models/baby.model";

interface AuthenticatedRequest extends Request {
    user?: { id: number }; // Modify based on your authentication logic
  }

// Babies Controller
export const getBabies = async (req: Request, res: Response) => {
  try {
    const babies = await Baby.findAll({ where: { userId: req.params.userId }, include: [
      { model: PumpSession, as: 'pumpSessions' },
      { model: HealthLog, as: 'healthLogs' },
      { model: Feed, as: 'feeds' },
    ] });
    res.json(babies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const createBaby = async (req: Request, res: Response) => {
  try {
    const { babyName, babyAge, babyHeight, babyWeight, birthDate, gender, imageUri } = req.body;
    
    const baby = await Baby.create({
      userId: req.params.userId,
      name: babyName,
      age: parseInt(babyAge, 10),
      height: parseInt(babyHeight, 10),
      weight: parseInt(babyWeight, 10),
      birthDate: birthDate ? new Date(birthDate) : null,
      gender,
      imageBase: imageUri
    });
    res.status(201).json(baby);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const getBaby = async (req: Request, res: Response) => {
  try {
    const baby = await Baby.findAll({
      where: {
        userId: req.params.id, // Match the userId with the passed ID in params
      },
      include: [
        { model: Feed, as: "feeds" }, // Include feeds associated with the baby
        { model: PumpSession, as: "pumpSessions" }, // Include pump sessions
        { model: HealthLog, as: "healthLogs" }, // Include health logs
      ],
    });
    res.json(baby);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const deleteBaby = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Baby.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Baby deleted successfully" });
    } else {
      res.status(404).json({ message: "Baby not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const updateBaby = async (req: Request, res: Response) => {
  try {
    const { id, ...data } = req.body;
    const [updated] = await Baby.update(data, { where: { id } });
    if (updated) {
        const updatedBaby = await Baby.findByPk(id);
        res.status(200).json(updatedBaby);
    } else {
        res.status(404).json({ message: "Baby not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

// Feeds Controller
export const getFeeds = async (req: Request, res: Response) => {
  try {
    const feeds = await Feed.findAll({ where: { babyId: req.params.babyId }, include: [
      { model: Baby, as: 'baby' },
      { model: PumpSession, as: 'pumpSession' },
      { model: HealthLog, as: 'healthLog' },
      { model: Feed, as: 'feed' },
    ] });
    res.json(feeds);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const createFeed = async (req: Request, res: Response) => {
  try {
    const feed = await Feed.create({
      babyId: req.params.babyId,
      feedType: req.body.feedType,
      feedTime: new Date(),
      durationMins: parseInt(req.body.duration, 10),
      quantityMl: parseInt(req.body.amount, 10)
    });
    res.status(201).json(feed);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const updateFeed = async (req: any, res: Response) => {
  try {
    const { babyId, feedId, ...data } = req.body;
    const [updated] = await Feed.update(data, { where: { babyId, feedId } });
    if (updated) {
        const updatedFeed = await Feed.findByPk(feedId);
        res.status(200).json(updatedFeed);
    } else {
        res.status(404).json({ message: "Feed not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const deleteFeed = async (req: any, res: Response) => {
  try {
    const { babyId, feedId } = req.params;
    const deleted = await Feed.destroy({ where: { babyId, feedId } });
    if (deleted) {
      res.status(200).json({ message: "Feed deleted successfully" });
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

// Pump Sessions Controller
export const getPumpSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await PumpSession.findAll({ where: { babyId: req.params.babyId } });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const createPumpSession = async (req: Request, res: Response) => {
  try {
    const session = await PumpSession.create({ ...req.body, babyId: req.params.babyId });
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const updatePumpSession = async (req: any, res: Response) => {
  try {
    const { babyId, pumpSessionId, ...data } = req.body;
    const [updated] = await PumpSession.update(data, { where: { babyId, pumpSessionId } });
    if (updated) {
        const updatedPumpSession = await PumpSession.findByPk(pumpSessionId);
        res.status(200).json(updatedPumpSession);
    } else {
        res.status(404).json({ message: "Pump session not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const deletePumpSession = async (req: any, res: Response) => {
  try {
    const { babyId, pumpSessionId } = req.params;
    const deleted = await PumpSession.destroy({ where: { babyId, pumpSessionId } });
    if (deleted) {
      res.status(200).json({ message: "Pump session deleted successfully" });
    } else {
      res.status(404).json({ message: "Pump session not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

// Health Logs Controller
export const getHealthLogs = async (req: Request, res: Response) => {
  try {
    const logs = await HealthLog.findAll({ where: { babyId: req.params.babyId } });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const createHealthLog = async (req: Request, res: Response) => {
  try {
    const log = await HealthLog.create({
      babyId: req.params.babyId,
      diaperChanges: parseInt(req.body.diaperChanges, 10),
      temperature: parseFloat(req.body.temperature),
      notes: req.body.notes
     });
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const updateHealthLog = async (req: any, res: Response) => {
  try {
    const { babyId, healthLogId, ...data } = req.body;
    const [updated] = await HealthLog.update(data, { where: { babyId, healthLogId } });
    if (updated) {
        const updatedHealthLog = await HealthLog.findByPk(healthLogId);
        res.status(200).json(updatedHealthLog);
    } else {
        res.status(404).json({ message: "Health log not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const deleteHealthLog = async (req: any, res: Response) => {
  try {
    const { babyId, healthLogId } = req.params;
    const deleted = await HealthLog.destroy({ where: { babyId, healthLogId } });
    if (deleted) {
      res.status(200).json({ message: "Health log deleted successfully" });
    } else {
      res.status(404).json({ message: "Health log not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const createSleepLog = async (req: Request, res: Response) => {
  try {
    const log = await SleepLog.create({
      babyId: req.params.babyId,
      durationMins: parseInt(req.body.duration, 10),
      sleepQuality: req.body.sleepQuality,
      notes: req.body.notes
     });
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const updateSleepLog = async (req: any, res: Response) => {
  try {
    const { babyId, sleepLogId, ...data } = req.body;
    const [updated] = await SleepLog.update(data, { where: { babyId, sleepLogId } });
    if (updated) {
        const updatedSleepLog = await SleepLog.findByPk(sleepLogId);
        res.status(200).json(updatedSleepLog);
    } else {
        res.status(404).json({ message: "Sleep log not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const deleteSleepLog = async (req: any, res: Response) => {
  try {
    const { babyId, sleepLogId } = req.params;
    const deleted = await SleepLog.destroy({ where: { babyId, sleepLogId } });
    if (deleted) {
      res.status(200).json({ message: "Sleep log deleted successfully" });
    } else {
      res.status(404).json({ message: "Sleep log not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const getSleepLogs = async (req: Request, res: Response) => {
  try {
    const logs = await SleepLog.findAll({ where: { babyId: req.params.babyId } });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};