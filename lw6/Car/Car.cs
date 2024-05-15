namespace CarNS
{
    public enum Direction
    {
        FORWARD,
        BACKWARD,
        IMMOBILE
    }

    public class Car
    {
        private int m_gear = 0;
        private int m_speed = 0;
        private bool m_isEngineOn = false;

        private readonly Dictionary<int, Tuple<int, int>> gearSpeedRange = new Dictionary<int, Tuple<int, int>>
        {
            { -1, Tuple.Create(-20, 0) },
            { 0, Tuple.Create(0, 150) },
            { 1, Tuple.Create(0, 30) },
            { 2, Tuple.Create(20, 50) },
            { 3, Tuple.Create(30, 60) },
            { 4, Tuple.Create(40, 90) },
            { 5, Tuple.Create(50, 150) }
        };

        public bool TurnOnEngine()
        {
            m_isEngineOn = true;
            return true;
        }

        public bool TurnOffEngine()
        {
            if ((m_gear != 0) || (m_speed != 0))
            {
                return false;
            }

            m_isEngineOn = false;
            return true;
        }

        private bool CheckSpeedRange(int speed, int gear)
        {
            var range = gearSpeedRange[gear];
            return speed >= range.Item1 && speed <= range.Item2;
        }

        public bool SetGear(int gear)
        {
            if (!IsTurnedOn())
            {
                return false;
            }

            switch (gear)
            {
                case -1:
                    if (m_speed != 0 && m_gear != gear)
                    {
                        return false;
                    }
                    break;

                case 0:
                    break;

                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    if (!CheckSpeedRange(m_speed, gear))
                    {
                        return false;
                    }
                    break;

                default:
                    return false;
            }

            m_gear = gear;
            return true;
        }

        public bool SetSpeed(int speed)
        {
            if (speed < 0)
            {
                return false;
            }

            switch (m_gear)
            {
                case -1:
                    if (-speed < gearSpeedRange[-1].Item1)
                    {
                        return false;
                    }
                    m_speed = -speed;
                    return true;

                case 0:
                    if (speed > Math.Abs(m_speed))
                    {
                        return false;
                    }
                    m_speed = (m_speed < 0) ? -speed : speed;
                    return true;

                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    if (!CheckSpeedRange(speed, m_gear))
                    {
                        return false;
                    }
                    m_speed = speed;
                    return true;

                //сюда мы никогда не попадём, т.к передача не может быть невалидной
                default:
                    return false;
            }
        }

        public bool IsTurnedOn()
        {
            return m_isEngineOn;
        }

        public Direction GetDirection()
        {
            if (m_speed > 0)
                return Direction.FORWARD;
            else if (m_speed == 0)
                return Direction.IMMOBILE;
            else
                return Direction.BACKWARD;
        }

        public int GetSpeed()
        {
            return m_speed;
        }

        public int GetGear()
        {
            return m_gear;
        }

        public static void Main(string[] args)
        {
         
        }
    }
}
