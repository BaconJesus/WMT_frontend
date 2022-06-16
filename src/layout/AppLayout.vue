<template>
  <DesktopNavbar />
<!--  <NavbarDropdown />-->

</template>

<script>
import DesktopNavbar from "@/components/DesktopNavbar";
// import NavbarDropdown from "@/components/NavbarDropdown";
export default {
   inject: ['GStore'],
  name: "AppLayout",
  components: {DesktopNavbar, }
}
</script>

