import './App.css';
import { DID } from "dids";
import CeramicClient from "@ceramicnetwork/ceramic-http-client";
import { IDXWeb } from "@ceramicstudio/idx-web";
import { publishIDXConfig } from "@ceramicstudio/idx-tools";
import {
  ThreeIdConnect,
  EthereumAuthProvider,
} from "../../node_modules/3id-connect/src/index";
import web3Modal from "../utils/provider.js";
import { Button } from 'antd';
import LinkedStateMixin from 'react-addons-linked-state-mixin';


var idx =  {}
var ceramicb= {}
var did = {}
var profile = {}
var id =  ""
var ethaddress = ""
var auth=  false

// async function saveProfile() {
//   const profileData = profiles.map(profile => ({
//     y: table.y,
//     profile:profile.profile,
//     did:profile.id,
//     ethadress:profile.ethaddress,
//     method:profile.update,
//   }),

//   dispatch(Actions.save(profiles.channel, profileData)),
// }
const saveProfile = () => {
  const [idx, setIdx] = useState("") //update idx to id
  const [ceramic, setCeramic] = useState("")
  const [did, setDid] = useState("")
  const [profile, setProfile] = useState("")
  const [ethaddress, setEthaddress] = useState("")
  const [auth, setAuth] = useState(false)
  const OnChange = (e) => setIdx(e.target.id, e.target.profile, e.target.ethaddress, e.target.Update())
}
  const Card = (props) => {
    const nameProps = useDataBind()
    return(
      <>
      <Button {...nameProps} onClick>

      </Button>
      </>
    )
  }



const Authenticate = async () => {
  const THREEID_CONNECT_URL = "https://3idconnect.org/index.html";
  const DEFAULT_API_URL = "https://ceramic.3boxlabs.com";
  const API_URL = "http://localhost:7007";
  const threeIdConnect = new ThreeIdConnect(THREEID_CONNECT_URL);
  const ceramic = new CeramicClient(DEFAULT_API_URL);
  //auth
  const ethProvider = await web3Modal.connect();
  const addresses = await ethProvider.request({ method: "eth_accounts" });
  console.log("Got the ethaddress");
  this.ethaddress = addresses[0];
  const authProvider = new EthereumAuthProvider(ethProvider, addresses[0]);
  await threeIdConnect.connect(authProvider);
  console.log("3id connect func executed");
  const didProvider = await threeIdConnect.getDidProvider();
  console.log("didProvider accessed");
  //console.dir( didProvider)
  const did = new DID({ provider: didProvider });
  //console.dir(did)
  await did.authenticate();
  console.log("This is the did " + did.id);
  const jws = await did.createJWS({ hello: "world" });
  console.log(jws);
  const { definitions } = await publishIDXConfig(ceramic);
  console.log("The Definitions");
  console.log(definitions);
  const appDefinitions = {
    profile: definitions.basicProfile,
  };
  await ceramic.setDIDProvider(didProvider);
  console.log("Ceramic DID Provider set");
  const idx = new IDXWeb({
    ceramic,
    definitions: appDefinitions,
    connect: threeIdConnect,
  });
  console.log("new idx instance created");
  const ethereum = { provider: ethProvider, address: addresses[0] };
  await idx.authenticate(ethereum);
  if (idx.authenticated) {
    console.log("authenticated IDX!!");
    //redirect upon this
    this.auth = true;
    this.id = idx.id;
    if (this.auth) {
      const MyProfile = await idx.get("profile", idx.id);
      this.profile = MyProfile;
      console.log("My Profile");
      console.dir(MyProfile);
    }
    this.idx = idx;
    this.ceramic = ceramic;
    this.did = did;
    this.component = "card3";
  }
}
const Edit = async () => {
  if (this.auth) {
    this.component = "card4";
  }
}
const Update = async (profile2) => {
  if (this.idx.authenticated) {
    console.log("update");
    const doc = await this.idx.set("profile", profile2);
    console.log(doc);
    const MyProfile = await this.idx.get("profile", this.idx.id);
    this.profile = MyProfile;
    this.component = "card3";
  }
}

function App() {
  return (
    <div>
      <Button type="primary" style={{padding:0 , position:"auto"}} onClick={ Authenticate(),
            Edit(),
            Update(),
            saveProfile()
            } >
      Primary Button
    </Button>
    </div>
  );
}

export default App;
