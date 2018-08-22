<template>
  <div class="wrapper">
    <nav>
      <div class="logo">LOGO</div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Admin</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">SearchBar</a></li>
      </ul>
    </nav>
    <section class="sec1"></section>
    <section class="content">
      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleScroll () {
      console.log('scrolling...')
      if (window.scrollY > 0) {
        console.log('Adding a class')
        // add a class here like:
        // $('nav').addClass('black')
      } else {
        console.log('Remove class')
        // remove that class like:
        // $('nav').removeClass('black')
      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: Quicksand;
  }
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 10px 100px;
    box-sizing: border-box;
    transition: .3s;
  }
  nav.black {
    background: rgba(0, 0, 0, 0.8);
    height: 100px;
    padding: 10px 100px;
  }

  nav .logo {
    padding: 22px 20px;
    height: 80px;
    float: left;
    font-size: 24px;
    transition: .3s;
  }

  nav.black .logo {
    color: #fff;
  }

  nav ul {
    list-style: none;
    float: right;
    margin: 0;
    padding: 0;
    display: flex;
  }

  nav ul li {
    list-style: none;
  }

  nav ul li a {
    line-height: 80px;
    color: #151515;
    padding: 12px 30px;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.3s;
  }

  nav.black ul li a {
    color: #fff;
  }

  nav ul li a:focus {
    outline: none;
  }

  nav ul li a.active {
    background: #e2472f;
    color: #fff;
    border-radius: 6px;
  }

  section.sec1 {
    width: 100%;
    height: 100vh;
    background: url(../assets/BG.jpg);
    background-size: cover;
    background-position: center;
  }

  .content {
    margin-top: 80px;
  }

  .content p {
    width: 900px;
    margin: 30px auto;
    text-align: justify;
    font-size: 20px;
    line-height: 30px;
  }

</style>
