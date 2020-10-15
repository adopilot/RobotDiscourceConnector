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
          const url = "http://erp.rgt.ba/ipPref/Task?url=" + encodeURIComponent(model.shareUrl) + "&title=" + encodeURIComponent(title);  
          window.open(url, '_blank');
        });
         api.attachWidgetAction("post-menu", "kasaProblem", function() {
          const model = this.attrs;
          const url = "http://core.rgt.ba/ProblemiKasa/Create?url=" + encodeURIComponent(link); 
           let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000";
          window.open(url, , "Robot", params);
        });

        api.addPostMenuButton("show-raw", () => {
          return {
            action: "utroseniSati",
            icon: "fa-check",
            className: "raw-post",
            title: "Zabilježite utrošene sate",
            position: "first-last-hidden"
          };
        });
        
         api.addPostMenuButton("show-raw", () => {
          return {
            action: "kasaProblem",
            icon: "cart-plus",
            className: "raw-post",
            title: "Orvorite problem na kasi",
            position: "second-last-hidden"
          };
        });
        
      }
    });
  }
};
