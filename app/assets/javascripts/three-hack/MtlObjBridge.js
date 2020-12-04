/**
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */

MtlObjBridge = {
  /**
   *
   * @param processResult
   * @param assetLoader
   */
  link: function (processResult, assetLoader) {
    if (typeof assetLoader.addMaterials === "function") {
      assetLoader.addMaterials(
        this.addMaterialsFromMtlLoader(processResult),
        true
      );
    }
  },

  /**
   * Returns the array instance of {@link MTLLoader.MaterialCreator}.
   *
   * @param Instance of {@link MTLLoader.MaterialCreator}
   */
  addMaterialsFromMtlLoader: function (materialCreator) {
    let newMaterials = {};

    if (materialCreator instanceof THREE.MTLLoader.MaterialCreator) {
      materialCreator.preload();
      newMaterials = materialCreator.materials;
    }

    return newMaterials;
  },
};
