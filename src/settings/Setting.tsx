import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import "./Setting.scss";
import { useSetting } from "./useSetting";

export function Setting() {
  const {
    fromHours: settingFromHours,
    setFromHours: setSettingFromHours,

    toHours: settingToHours,
    setToHours: setSettingToHours,

    questions: settingQuestions,
    setQuestions: setSettingQuestions,
  } = useSetting();

  const [displayFromHours, setDisplayFromHours] = useState(settingFromHours);
  const [displayToHours, setDisplayToHours] = useState(settingToHours);

  const [displayQuestions, setDisplayQuestions] = useState(settingQuestions);

  const navigate = useNavigate();

  return (
    <div className="settings-Setting">
      <div className="content">
        <h1>Settings</h1>

        <div className="label">From Hours</div>
        <Input value={displayFromHours} setValue={setDisplayFromHours} />

        <div className="label">To Hours</div>
        <Input value={displayToHours} setValue={setDisplayToHours} />

        <div className="label">Questions</div>
        <Input value={displayQuestions} setValue={setDisplayQuestions} />
      </div>

      <div
        className="save"
        onClick={() => {
          setSettingFromHours(displayFromHours);
          setSettingToHours(displayToHours);
          setSettingQuestions(displayQuestions);

          navigate("/");
        }}
      >
        Save
      </div>
    </div>
  );
}
