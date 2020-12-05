import React, { FC, useState } from "react";

import { getMinutes, getSeconds } from "../../helpers";

type SetTimesFormProps = {
  workTime: number;
  restTime: number;
  onSubmit: (newWorkTime: number, newRestTime: number) => void;
};

const SetTimesForm: FC<SetTimesFormProps> = (props) => {
  const { workTime, restTime, onSubmit } = props;

  const [workmin, setWorkmin] = useState<number>(getMinutes(workTime));
  const [worksec, setWorksec] = useState<number>(getSeconds(workTime));
  const [restmin, setRestmin] = useState<number>(getMinutes(restTime));
  const [restsec, setRestsec] = useState<number>(getSeconds(restTime));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (e.target.name === "workmin") {
      setWorkmin(value);
    } else if (e.target.name === "worksec") {
      setWorksec(value);
    } else if (e.target.name === "restmin") {
      setRestmin(value);
    } else if (e.target.name === "restsec") {
      setRestsec(value);
    } else {
      return;
    }
  };

  const submitHander = (e: React.FormEvent) => {
    const newWorkTime = workmin * 60 + worksec;
    const newRestTime = restmin * 60 + restsec;
    onSubmit(newWorkTime, newRestTime);
    e.preventDefault();
  };

  return (
    <form onSubmit={submitHander}>
      <div>
        Set Work Interval:{" "}
        <label>
          <input
            onChange={handleChange}
            name="workmin"
            type="number"
            min="0"
            max="59"
            defaultValue={getMinutes(workTime)}
          />
          min
        </label>
        <label>
          <input
            onChange={handleChange}
            name="worksec"
            type="number"
            min="0"
            max="59"
            defaultValue={getSeconds(workTime)}
          />
          sec
        </label>
      </div>
      <div>
        Set Rest Interval:
        <label>
          <input
            onChange={handleChange}
            name="restmin"
            type="number"
            min="0"
            max="59"
            defaultValue={getMinutes(restTime)}
          />
          min
        </label>
        <label>
          <input
            onChange={handleChange}
            name="restsec"
            type="number"
            min="0"
            max="59"
            defaultValue={getSeconds(restTime)}
          />
          sec
        </label>
      </div>
      <input type="submit" value="Save" />
      <input type="reset" value="Reset" />
    </form>
  );
};

export default SetTimesForm;
