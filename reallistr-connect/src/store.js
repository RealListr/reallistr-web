export const store = {
  properties: [],
  leads: [],
  campaigns: [],
  subscription: null,
  agent: { name: "Agent", avatar: "" },
  agency: { name: "Reallistr", avatar: "" },
  team: [ /* multiple agents for settings */
    // { name:"Alex", avatar:"data:", followers:1200 }
  ],
  persist(){
    localStorage.setItem('connectStore', JSON.stringify({
      properties:this.properties,
      leads:this.leads,
      campaigns:this.campaigns,
      subscription:this.subscription,
      agent:this.agent,
      agency:this.agency,
      team:this.team
    }));
  }
};

export async function initStore(){
  const saved = localStorage.getItem('connectStore');
  if(saved){ Object.assign(store, JSON.parse(saved)); return; }
  try{
    const bundle = await fetch('../data/demo_bundle.json').then(r=>r.json());
    store.properties   = bundle.properties   || [];
    store.leads        = bundle.leads        || [];
    store.campaigns    = bundle.campaigns    || [];
    store.subscription = bundle.subscription || { plan:'starter', usage_props:0, usage_media_gb:0, ai_credits:0 };
    store.agent        = bundle.agent        || store.agent;
    store.agency       = bundle.agency       || store.agency;
    store.team         = bundle.team         || store.team;
    store.persist();
  }catch(e){
    store.subscription = { plan:'starter', usage_props:0, usage_media_gb:0, ai_credits:0 };
    store.persist();
  }
}
