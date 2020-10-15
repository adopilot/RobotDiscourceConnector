import I18n from "I18n";
import { withPluginApi } from "discourse/lib/plugin-api";
import showModal from "discourse/lib/show-modal";

export default {
  name: "RobotDiscourceConnector",
  initialize() {
    withPluginApi("0.8.7", api => {
      const currentUser = api.getCurrentUser();
      if (!currentUser) return;

      if (
        currentUser.staff ||
        currentUser.trust_level >= settings.min_trust_level
      ) {
        api.attachWidgetAction("post-menu", "utroseniSati", function() {
          const model = this.attrs;
          const url = "http://erp.rgt.ba/ipPref/Task?url=" + encodeURIComponent(model.shareUrl) + "&title=" + encodeURIComponent(model.title);  
          window.open(url, '_blank');
        });

        api.addPostMenuButton("show-raw", () => {
          return {
            action: "utroseniSati",
            icon: "fas-check",
            className: "raw-post",
            title: "Zabilježite utrošene sate",
            position: "second-last-hidden"
          };
        });
      }
    });
  }
};
