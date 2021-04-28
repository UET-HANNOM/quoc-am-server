import fs from "fs";
export default class scanService {
  public scan = (file: any) => {
    console.log(file);
    var obj = JSON.parse(
      fs.readFileSync("src/python-module/boxes.json", "utf8")
    );
    return obj;
  };
}
