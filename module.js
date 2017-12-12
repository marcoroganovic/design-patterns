const App = (() => {
  let id = 0;
  const MODULES = {};
  
  const define = (name, deps, fn) => {
    MODULES[name] = {
      id: id++,
      definition: () => fn.apply(fn, deps.map(dep => MODULES[dep]))
    }
  }
  
  const get = name => MODULES[name];
  
  return {
    module: { define, get },
    
    init() {
      
      Object.keys(MODULES).map((name, idx) => ({ 
        name, 
        moduleId: MODULES[name].id,
        index: idx
      })).sort((left, right) => {
        const a = left.moduleId;
        const b = right.moduleId;
        
        if(a !== b) {
          if(a > b) return 1;
          if(a < b) return -1;
        }
        
        return left.index - right.index;
      }).forEach(({ name }) => {
        MODULES[name] = MODULES[name].definition();
      });
      
    }
  };
  
})();



App.module.define("dom", [], () => {
  const d = document;
  return {
    $: sel => d.querySelector(sel),
    $el: tag => d.createElement(sel),
    $frag: () => d.createDocumentFragment()
  };
});

App.module.define("ajax", [], () => {
  
  const get = url => {
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.open("GET", url)
      
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText);
        }
      }
    
      xhr.send(null);
    });
  }
  
  return {
    get
  };
  
});

App.module.define("app", ["dom", "ajax"], (dom, ajax) => {  
  ajax.get("https://jsonplaceholder.typicode.com/posts/1")
    .then(res => console.log(res));
  
  return {};
});

App.init();
