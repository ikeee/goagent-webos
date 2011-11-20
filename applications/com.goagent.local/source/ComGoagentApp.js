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
        }
    }
);
