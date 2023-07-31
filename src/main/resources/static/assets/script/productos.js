window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    const scrollPosition = window.scrollY;
    const navbarHeight = navbar.offsetHeight;
    const headerHeight = 200; 

    const opacity = Math.min(1, scrollPosition / (headerHeight - navbarHeight));
    if (scrollPosition > headerHeight) {
        navbar.classList.add("top-nav");
        navbar.classList.remove("navbar-interno_home")
      } else {
        navbar.classList.remove("top-nav");
        navbar.classList.add("navbar-interno_home")
      }
    navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  });


const {createApp} = Vue

createApp({
  data() {
    return {
        productos: [],

        tabacos: [],
        accesorios: [],
        cultivo: [],

        tabacosFiltrados: [],
        cultivoFiltrado: [],
        
        filtroTabacos: [],
        filtroCultivo: [],

        checkedCheckbox: [],
        seleccionadas: [],
        tabacosFiltrados: [],
        categoriasCultivo: [],
    };
  },
  created(){
     this.traerProductosTabacos();
     this.traerProductosCultivo();
    //  this.traerProductosAccesorio();
  },
  methods: {
    traerProductosTabacos(){
      axios
      .get('/api/productos')
      .then(response =>{
        this.productos = response.data

        this.format = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
      });

        //TABACOS
        this.tabacos = this.productos.filter(producto => producto.categoria == "TABACO");
        let marcas = this.tabacos.map( tabaco => tabaco.marca)
            const categorias = [...new Set(marcas)]
            this.tabacosFiltrados = categorias
            console.log(this.tabacos);
      })
      .catch(exception => {
        console.log(exception);
      })
    },

    traerProductosCultivo(){
      axios
      .get('/api/productos')
      .then(response =>{
        this.productos = response.data

        this.format = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
      });
        //CULTIVO
        this.cultivo = this.productos.filter(producto => producto.categoria == "CULTIVO")
        console.log(this.cultivo);
        let categoriasDeCultivo = this.cultivo.map(el => el.subCategoria)
            const catCultivos = [...new Set(categoriasDeCultivo)]
            this.categoriasCultivo = catCultivos;
            console.log(this.categoriasCultivo)
      })
      .catch(exception => {
        console.log(exception);
      })
    },

    // localstorage
    toggleSeleccion(id) {
      const producto = this.productos.find((e) => e.id == id);
      swal({
        title: "Agregar al carrito",
        text: `Ingrese la cantidad que desea agregar (Stock disponible: ${producto.cantidad})`,
        content: {
          element: "input",
          attributes: {
            type: "number",
            min: 1,
            max: producto.cantidad,
          },
        },
        buttons: {
          cancel: true,
          confirm: "Agregar",
        },
      }).then((value) => {
        if (value) {
          const cantidad = parseInt(value);
          if (cantidad > 0 && cantidad <= producto.cantidad) {
            const item = this.seleccionadas.find((e) => e.id == id);
            if (item) {
              item.cantidad += cantidad;
            } else {
              this.seleccionadas.push({
                ...producto,
                cantidad,
              });
            }
            const json = JSON.stringify(this.seleccionadas);
            localStorage.setItem("seleccionadas", json);
            swal("Success", "Producto agregado al carrito", "success");
          } else {
            swal("Error", "Cantidad inválida", "error");
          }
        }
      });
    },

    
  },
  computed: {
    filtroBusquedaCultivo(){
      if(this.checkedCheckbox.length != 0){
        this.filtroCultivo = this.cultivo.filter( producto => this.checkedCheckbox.includes(producto.subCategoria))
        console.log(this.filtroCultivo)
      }else{
        this.filtroCultivo = this.cultivo;
      }
  },  
    filtroBusquedaTabacos() {
      if (this.checkedCheckbox.length != 0) {
        this.filtroTabacos = this.tabacos.filter(tabaco => this.checkedCheckbox.includes(tabaco.marca));
        console.log(this.filtroTabacos)
      } else {
        this.filtroTabacos = this.tabacos;
      }
    },
}
}).mount("#app")





