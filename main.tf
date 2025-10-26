terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "pet_image" {
  name = "pet-website:latest"
  build {
    context    = "${path.module}"
    dockerfile = "${path.module}/Dockerfile"
  }
}

resource "docker_container" "pet_container" {
  name  = "pet-website-container"
  image = docker_image.pet_image.name

  ports {
    internal = 3000
    external = 8080
  }

  restart  = "always"
  must_run = true
}

output "website_url" {
  value       = "http://localhost:${docker_container.pet_container.ports[0].external}"
  description = "Pet website URL"
}
