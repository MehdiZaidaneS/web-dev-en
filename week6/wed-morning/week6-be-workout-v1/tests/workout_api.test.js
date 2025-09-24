const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  {
    title: "test workout 1",
    reps: 11,
    load: 101,
  },
  {
    title: "test workout 2",
    reps: 12,
    load: 102,
  },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});

describe("Workout API", () => {
  describe("when there are initially some workouts saved", () => {
    it("returns all workouts", async () => {
      const response = await api.get("/api/workouts");
      expect(response.body).toHaveLength(initialWorkouts.length);
    });

    it("returns workouts in JSON format", async () => {
      await api
        .get("/api/workouts")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    it("includes a specific workout in the returned list", async () => {
      const response = await api.get("/api/workouts");
      const titles = response.body.map((r) => r.title);
      expect(titles).toContain("test workout 2");
    });
  });

  describe("adding a new workout", () => {
    it("succeeds when the workout data is valid", async () => {
      const newWorkout = {
        title: "Situps",
        reps: 25,
        load: 10,
      };

      await api
        .post("/api/workouts")
        .send(newWorkout)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/workouts");
      const titles = response.body.map((r) => r.title);

      expect(response.body).toHaveLength(initialWorkouts.length + 1);
      expect(titles).toContain("Situps");
    });

    it("fails with status 400 if workout has no title", async () => {
      const invalidWorkout = {
        reps: 23,
      };

      await api.post("/api/workouts").send(invalidWorkout).expect(400);

      const response = await api.get("/api/workouts");
      expect(response.body).toHaveLength(initialWorkouts.length);
    });
  });

  describe("deleting a workout", () => {
    it("succeeds with status 204 when the id is valid", async () => {
      const workoutsAtStart = await workoutsInDb();
      const workoutToDelete = workoutsAtStart[0];

      await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

      const titles = workoutsAtEnd.map((r) => r.title);
      expect(titles).not.toContain(workoutToDelete.title);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
