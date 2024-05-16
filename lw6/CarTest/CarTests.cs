using CarNS;

namespace CarTests
{
    [TestClass]
    public class CarTests
    {
        [TestMethod]
        public void Get_Start_Values()
        {
            // Arrange
            Car car = new Car();

            // Action

            // Assert
            Assert.AreEqual(0, car.GetGear(), "Gear should be 0 when starting");
            Assert.AreEqual(0, car.GetSpeed(), "Speed should be 0 when starting");
            Assert.IsFalse(car.IsTurnedOn(), "Engine should be off when starting");
            Assert.AreEqual(Direction.IMMOBILE, car.GetDirection(), "Direction should be IMMOBILE when starting");
        }

        [DataTestMethod]
        [DataRow(false, true, "Engine should be on after turning it on")]
        [DataRow(true, true, "Engine should remain on when trying to turn on an already running engine")]
        public void Switching_Engine_On_Tests(bool initialEngineState, bool expectedEngineState, string message)
        {
            // Arrange
            Car car = new Car();
            if (initialEngineState)
            {
                car.TurnOnEngine();
            }

            // Action
            car.TurnOnEngine();

            // Assert
            Assert.AreEqual(expectedEngineState, car.IsTurnedOn(), message);
        }


        [DataTestMethod]
        [DataRow(true, 0, 0, false, "Engine should be off after turning it off")]
        [DataRow(true, 1, 0, true, "Engine should not turn off when gear is not in neutral")]
        [DataRow(true, 1, 20, true, "Engine should not turn off when speed is not zero and gear is not in neutral")]
        public void Switching_Engine_Off_Tests(bool initialEngineState, int gear, int speed, bool expectedEngineState, string message)
        {
            // Arrange
            Car car = new Car();
            if (initialEngineState)
            {
                car.TurnOnEngine();
            }

            car.SetGear(gear);
            if (speed > 0)
            {
                car.SetSpeed(speed);
            }

            // Action
            car.TurnOffEngine();

            // Assert
            Assert.AreEqual(expectedEngineState, car.IsTurnedOn(), message);
        }


        [TestMethod]
        public void Set_Gear_R_When_Engine_Is_Off_And_Speed_Is_Not_Zero()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(-1);
            car.SetSpeed(20);
            car.SetGear(0);

            // Action
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(0, car.GetGear(), "Gear should not change to reverse when speed is not zero");
        }

        [DataTestMethod]
        [DataRow(1, true, 1, "Gear should be 1 after setting it when engine is on")]
        [DataRow(2, true, 0, "Gear should not change to 2 when speed is not within the acceptable range for gear 2")]
        [DataRow(-1, true, -1, "Gear should be reverse after setting it when engine is on and speed is zero")]
        [DataRow(-1, false, 0, "Gear should not change to reverse when engine is off")]
        public void Gear_Setting_Tests(int gearToSet, bool engineState, int expectedGear, string message)
        {
            // Arrange
            Car car = new Car();
            if (engineState)
            {
                car.TurnOnEngine();
            }

            // Action
            car.SetGear(gearToSet);

            // Assert
            Assert.AreEqual(expectedGear, car.GetGear(), message);
        }


        [DataTestMethod]
        [DataRow(-1, 20, 1, -1, "Gear should not change from reverse to 1 when speed is not zero")]
        [DataRow(-1, 0, -1, -1, "Gear should remain reverse when already set to reverse and speed is zero")]
        public void Gear_Transition_Tests(int initialGear, int speed, int newGear, int expectedGear, string message)
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(initialGear);
            if (speed > 0)
            {
                car.SetSpeed(speed);
            }

            // Action
            car.SetGear(newGear);

            // Assert
            Assert.AreEqual(expectedGear, car.GetGear(), message);
        }


        [TestMethod] 
        public void Set_Gear_With_Invalid_Gear_Should_Return_False()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Act
            bool result = car.SetGear(10);

            // Assert
            Assert.IsFalse(result, "SetGear should return false for a gear not present in the gearSpeedRange dictionary.");
        }

        [DataTestMethod]
        [DataRow(0, -1, false, "Setting speed less than zero should return false.")]
        [DataRow(-1, 30, false, "Setting speed to 30 on reverse gear should return false.")]
        [DataRow(6, 10, false, "Setting speed on an invalid gear should return false.")]
        public void Speed_Setting_Validation_Tests(int gear, int speed, bool expectedResult, string message)
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            if (gear != 0)
            {
                car.SetGear(gear);
            }

            // Act
            bool result = car.SetSpeed(speed);

            // Assert
            Assert.AreEqual(expectedResult, result, message);
        }

        [DataTestMethod]
        [DataRow(0, 20, 0, "Speed should not increase when engine is on and gear is neutral")]
        [DataRow(0, 0, 0, "Speed should be 0 when set to 0 with engine on")]
        [DataRow(null, 20, 0, "Speed should not change when engine is off")]
        [DataRow(1, 60, 0, "Speed should not change when set above the interval of gear 1")]
        public void Speed_Adjustment_Tests(int? gear, int speed, int expectedSpeed, string message)
        {
            // Arrange
            Car car = new Car();
            if (gear.HasValue)
            {
                car.TurnOnEngine();
                car.SetGear(gear.Value);
            }

            // Action
            car.SetSpeed(speed);

            // Assert
            Assert.AreEqual(expectedSpeed, car.GetSpeed(), message);
        }

        [DataTestMethod]
        [DataRow(1, 20, 20, Direction.FORWARD, "Speed should be 20 when set within the interval of gear 1")]
        [DataRow(1, -10, 0, Direction.IMMOBILE, "Speed should not change when set below the interval of gear 1")]
        [DataRow(-1, 10, -10, Direction.BACKWARD, "Speed should be -10 when set within the interval of reverse gear")]
        public void Set_Speed_And_Direction_With_Gear_Tests(int gear, int speed, int expectedSpeed, Direction expectedDirection, string message)
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(gear);

            // Action
            car.SetSpeed(speed);

            // Assert
            Assert.AreEqual(expectedSpeed, car.GetSpeed(), message);
            Assert.AreEqual(expectedDirection, car.GetDirection(), message);
        }


    }
}
