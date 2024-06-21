import db, { ITraining } from "./db";

export function getTrainings() {
  const stmt = db.prepare<[], ITraining>("SELECT * FROM trainings");
  return stmt.all();
}
