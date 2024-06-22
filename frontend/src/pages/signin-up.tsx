import { useState } from "react"
import Signinform from "../@/components/sign-inform"
import Signupform from "../@/components/sign-upform"
import { Label } from "../@/components/ui/label"
import { Switch } from "../@/components/ui/switch"

function Signinup() {

    const [submit, setsubmit] = useState<boolean>(false)
    return (<div className="h-full w-full grid place-items-center">

        {!submit ? <Signinform /> : <Signupform setsubmit={setsubmit} />}
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" checked={submit}
                onCheckedChange={() => setsubmit(prev => !prev)} />
            <Label htmlFor="airplane-mode">{submit ? "Sign-In" : "Sign-Up"}</Label>
        </div>

    </div>)
}

export default Signinup
