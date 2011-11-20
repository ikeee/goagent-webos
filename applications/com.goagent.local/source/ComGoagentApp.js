enyo.kind
(
    {
    	name: "ComGoagentApp",kind: enyo.VFlexBox,components: [

		    {kind: "PageHeader", components: [
					{kind:"Image", src:"settings32.png"},        			
        			{content: "Settings"}
			 ]},
			 
		    {kind: "Pane",components: [   
				     {kind: "InputBox", components:[
				     		{kind: "LabeledContainer", label:"Enable",width:"220px"},
							{kind: "ToggleButton",onLabel:"On",offLabel:"Off",onChange:"buttonToggle"}
				    ]}
		        ]}    
	    ],
	    
        buttonToggle:function(inSender,inState)
        {
            this.log("current state is "+inState);
            this.sendRequest();
        },
        handleResponse:function(future)
        {
            this.log(future.result);
        },
        handleFailure:function(future)
        {
            this.log(future.result);
        },
        sendRequest:function()
        {
            this.controller.serviceRequest("palm://com.goagent.local.service",{method:"version",parameters:{},onSuccess:this.handleResponse,onFailure:this.handleFailure});
        }
    }
);
