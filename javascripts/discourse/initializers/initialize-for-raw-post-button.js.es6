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
          const link = window.location.href;
          const url = "http://erp.rgt.ba/ipPref/Task?url=" + encodeURIComponent(link) + "&title=Naplata";  
          window.open(url, '_blank');
        });
        
         api.attachWidgetAction("post-menu", "kasaProblem", function() {
           const model = this.attrs; 
           const link = window.location.href;
           const url = "http://core.rgt.ba/ProblemiKasa/Create?url=" + encodeURIComponent(link);
           window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=' + 265);
           
        });

        api.addPostMenuButton("utroseni-sati", (attrs) => {
          return {
            action: "utroseniSati",
            icon: "cart-plus",
            className: "raw-post",
            title: "Zabilježite utrošene sate",
            position: 'first'
          };
        });
        
         api.addPostMenuButton("kasa-problem", (attrs) => {
          return {
            action: "kasaProblem",
            icon: "check",
            className: "raw-post",
            title: "Orvorite problem na kasi",
            position: 'second'
          };
        });
        
      }
    });
  }
};
