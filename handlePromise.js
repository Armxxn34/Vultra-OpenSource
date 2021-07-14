module.exports = async promise => {
 try {
   const data = await promise;
   return [data, null];
 } catch (e) {
   console.error(e);
   return [null, e];
 }
};
