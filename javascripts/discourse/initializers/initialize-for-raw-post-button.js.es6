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
          const url = "http://erp.rgt.ba/ipPref/Task?url=" + encodeURIComponent(model.shareUrl) + "&title=Naplata";  
          window.open(url, '_blank');
        });
         api.attachWidgetAction("post-menu", "kasaProblem", function() {
          const model = this.attrs;
           let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100";

          const url = "http://core.rgt.ba/ProblemiKasa/Create?url=" + model.shareUrl; 
          window.open(url, 'Problem na kasi', params);
        });

        api.addPostMenuButton("show-raw", () => {
          return {
            action: "utroseniSati",
            icon: "check",
            className: "raw-post",
            title: "Zabilježite utrošene sate"
          
          };
        });
        
         api.addPostMenuButton("show-raw", () => {
          return {
            action: "kasaProblem",
            icon: "cart-plus",
            className: "raw-post",
            title: "Orvorite problem na kasi"
            
          };
        });
        
      }
    });
  }
};
