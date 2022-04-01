import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import "./Setting.scss";
import { useSetting } from "./useSetting";

export function Setting() {
  const {
    fromDays: settingFromDays,
    setFromDays: setSettingFromDays,

    toDays: settingToDays,
    setToDays: setSettingToDays,

    questions: settingQuestions,
    setQuestions: setSettingQuestions,
  } = useSetting();

  const [displayFromDays, setDisplayFromDays] = useState(settingFromDays);
  const [displayToDays, setDisplayToDays] = useState(settingToDays);

  const [displayQuestions, setDisplayQuestions] = useState(settingQuestions);

  const navigate = useNavigate();

  return (
    <div className="settings-Setting">
      <div className="content">
        <h1>Settings</h1>

        <div className="label">From Days</div>
        <Input value={displayFromDays} setValue={setDisplayFromDays} />

        <div className="label">To Days</div>
        <Input value={displayToDays} setValue={setDisplayToDays} />

        <div className="label">Questions</div>
        <Input value={displayQuestions} setValue={setDisplayQuestions} />
      </div>

      <div
        className="save"
        onClick={() => {
          setSettingFromDays(displayFromDays);
          setSettingToDays(displayToDays);
          setSettingQuestions(displayQuestions);

          navigate("/");
        }}
      >
        Save
      </div>
    </div>
  );
}
