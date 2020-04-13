const addPkm = (newTeam, numteam) => {
  return {
    type: "ADD_pkm",
    newTeam,
    numteam
  };
};

const remPkm = () => {
  return {
    type: "REM_pkm"
  };
};

const allpkm = () => {
  return {
    type: "all_pkm"
  };
};
export default {
  addPkm,
  remPkm,
  allpkm
};
