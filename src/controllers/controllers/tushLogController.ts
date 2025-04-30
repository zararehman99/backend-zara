import { Request, Response } from 'express'
import TushLog from "./tushLog.model"


export const createTushLog = async (req: Request, res: Response) => {
  try {
    const { babyId } = req.params
    const {
      eventType,
      stoolFrequency,
      stoolConsistency,
      diaperCondition,
      abnormalities,
      additionalNotes,
    } = req.body

    const log = await TushLog.create({
      babyId: parseInt(babyId),
      eventType,
      stoolFrequency,
      stoolConsistency,
      diaperCondition,
      abnormalities,
      additionalNotes,
    })

    res.status(201).json(log)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Could not save tush log',
    })
  }
}

export const getTushLogs = async (req: Request, res: Response) => {
  try {
    const { babyId } = req.params
    const logs = await TushLog.findAll({ where: { babyId } })
    res.status(200).json(logs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not fetch tush logs' })
  }
}
