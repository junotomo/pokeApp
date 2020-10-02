import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { PokeAPI, Results, TYPE_COLOURS } from 'src/interfaces';
@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: PokeAPI;

  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemonDetails(params['id']);
      }
    )
  }

  ngOnInit(): void {
  }

  getPokemonDetails(id) {
    this.pokemonService.getPokemonDetails(id).subscribe(
      res => {
        console.log(res.card);
        this.pokemon = res.card;
      },
      err => {
        console.log(err);
      }
    )
  }

  _getTypeColour(type: string): string {
    console.log(type);

    if (type) {
      return '#' + TYPE_COLOURS[type.toLowerCase()];
    }
  }
}
